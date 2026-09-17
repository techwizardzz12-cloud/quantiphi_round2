import { store } from '../db/db.js'

export async function listProjects(_request, response, next) { try { response.json(await store.listProjects()) } catch (error) { next(error) } }
export async function getProject(request, response, next) { try { const project = await store.getProject(Number(request.params.id)); if (!project) return response.status(404).json({ message: 'Project not found' }); response.json(project) } catch (error) { next(error) } }
export async function createProject(request, response, next) { try { const name = request.body.name?.trim(); if (!name) return response.status(400).json({ message: 'Name is required' }); response.status(201).json(await store.createProject(name)) } catch (error) { next(error) } }
